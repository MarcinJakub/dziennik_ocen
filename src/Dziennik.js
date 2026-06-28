import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";

//31.05.2026

export default function Dziennik(){
    let tabOcen = [4,3,5];
    let tabWag = [1,2,5];

    const tablicaWierszy = [
        {
            przedmiot: "matematyka",
            tablicaOcen: tabOcen,
            tablicaWag: tabWag
        },
        {
            przedmiot: "polski",
            tablicaOcen: tabOcen,
            tablicaWag: tabWag
        }
        ];

    const obliczSrednia = (oceny, wagi) => {
        const licznik = oceny.reduce(
            (sum, ocena, i) => sum + ocena * wagi[i],
            0
        );

        const sumaWag = wagi.reduce(
            (sum, waga) => sum + waga,
            0
        );

        return licznik / sumaWag;
    }

    const [obecnaTablica, setObecnaTablica] = useState(tablicaWierszy);

    const wiersze = obecnaTablica.map((oceny) =>
        <tbody key={oceny.przedmiot}>
            <td>{oceny.przedmiot}</td>
            <td>
                {oceny.tablicaOcen.join(" ")}
            </td>
            <td>
                {oceny.tablicaWag.join(" ")}
            </td>
            <td>
                {obliczSrednia(oceny.tablicaOcen, oceny.tablicaWag).toFixed(2)}
            </td>
        </tbody>
        )

    const [clickedAddGrade, setClickedAddGrade] = useState(false);
    const [clickedAddSubject, setClickedAddSubject] = useState(false);
    const [incorrectDataGrade, setIncorrectDataGrade] = useState(false);
    const [incorrectDataWeight, setIncorrectDataWeight] = useState(false);
    const [lackOfSubjectName, setLackOfSubjectName] = useState(false);

    const [ocena, setOcena] = useState(0);
    const [waga, setWaga] = useState(0);
    const [przedmiot, setPrzedmiot] = useState("");

    const handleOnClickAddGrade = () => {
        setClickedAddGrade(true);
        setPrzedmiot(obecnaTablica[0].przedmiot);
    }

    const handleOnClickAddSubject = () => {
        setClickedAddSubject(true);
    }

    const handleOnChangePrzedmiot = (e) => {
        setPrzedmiot(e.target.value);
    }

    const handleOnChangeOcena = (e) => {
        setOcena(Number(e.target.value));
    }

    const handleOnChangeWaga = (e) => {
        setWaga(Number(e.target.value));
    }

    const handleOnSubmitAddGrade = (e) => {
        e.preventDefault()

        if(ocena >= 1 && ocena <= 6) setIncorrectDataGrade(false);
        if(waga >= 1 && waga <= 5) setIncorrectDataWeight(false);

        if(ocena >= 1 && ocena <= 6 && waga >= 1 && waga <= 5){
            setObecnaTablica((obecna) => obecna.map((wiersz) =>
                wiersz.przedmiot === przedmiot
                    ?
                    {...wiersz,
                        tablicaOcen: [...wiersz.tablicaOcen, Number(ocena)],
                        tablicaWag: [...wiersz.tablicaWag, Number(waga)]
                    }
                    :
                    wiersz
            ))
            setClickedAddGrade(false);
            setPrzedmiot("");
        }
        else if(ocena < 1 || ocena > 6) setIncorrectDataGrade(true);
        else if(waga < 1 || waga > 5) setIncorrectDataWeight(true);
    }

    const handleOnSubmitAddSubject = (e) => {
        e.preventDefault();
        let przedmiotyNiePowtarzajaSie = true;
        obecnaTablica.map((obiekt) =>
            {if(obiekt.przedmiot === przedmiot) przedmiotyNiePowtarzajaSie = false}
        )

        if(przedmiot.length !== 0) setLackOfSubjectName(false);
        if(ocena >= 1 && ocena <= 6) setIncorrectDataGrade(false);
        if(waga >= 1 && waga <= 5) setIncorrectDataWeight(false);
        console.log(przedmiot.length);

        if(ocena >= 1 && ocena <= 6 && waga >= 1 && waga <= 5 && przedmiotyNiePowtarzajaSie && przedmiot.length !== 0){
            const newRow = {
                przedmiot: przedmiot,
                tablicaOcen: [Number(ocena)],
                tablicaWag: [Number(waga)]
            }

            setObecnaTablica(obecnaTablica => [...obecnaTablica, newRow]);
            setClickedAddSubject(false);
        }

        else if(przedmiot.length === 0) setLackOfSubjectName(true);
        else if(ocena < 1 || ocena > 6) setIncorrectDataGrade(true);
        else if(waga < 1 || waga > 5) setIncorrectDataWeight(true);
    }

    return(
      <>
          <h1>Dziennik ocen</h1>
          <h3>Maciej Kowalski 3c</h3>

          {clickedAddGrade ?
              <form onSubmit={handleOnSubmitAddGrade}>
                  <h4>Formularz dodawania oceny</h4>
                  <label htmlFor="przedmiot" className="form-label">Wybierz przedmiot: </label>
                  <select onChange={handleOnChangePrzedmiot} className="form-select">
                      {obecnaTablica.map((wiersz) =>
                          <option key={wiersz.przedmiot}>{wiersz.przedmiot}</option>
                      )}
                  </select><br/>
                  <label htmlFor="ocena" className="form-label">Podaj ocenę (1-6): </label>
                  <input type="number" id="ocena" onChange={handleOnChangeOcena} className="form-text"/><br/>
                  <label htmlFor="waga" className="form-label">Podaj wagę (1-5): </label>
                  <input type="number" id="waga" onChange={handleOnChangeWaga} className="form-text"/><br/>
                  <input type="submit" value="Dodaj" className="btn btn-primary"/>
                  {incorrectDataGrade ? <p className="text-danger">Podano nieprawidłową wartość oceny</p> : ""}
                  {incorrectDataWeight ? <p className="text-danger">Podano nieprawidłową wartość wagi</p> : ""}
              </form>
              :
              <button onClick={handleOnClickAddGrade} className="btn btn-primary">Dodaj ocenę</button>}
          <br/><br/>
          {clickedAddSubject ?
              <form onSubmit={handleOnSubmitAddSubject}>
                  <h4>Formularz dodawania przedmiotu</h4>
                  <label htmlFor="przedmiot" className="form-label">Podaj nazwę przedmiotu: </label>
                  <input type="text" id="przedmiot" className="form-text" onChange={handleOnChangePrzedmiot}/><br/>
                  <label htmlFor="ocena" className="form-label">Podaj ocenę (1-6): </label>
                  <input type="number" id="ocena" onChange={handleOnChangeOcena} className="form-text"/><br/>
                  <label htmlFor="waga" className="form-label">Podaj wagę (1-5): </label>
                  <input type="number" id="waga" onChange={handleOnChangeWaga} className="form-text"/><br/>
                  <input type="submit" value="Dodaj" className="btn btn-primary"/>
                  {lackOfSubjectName ? <p className="text-danger">Brak nazwy przedmiotu!</p> : ""}
                  {incorrectDataGrade ? <p className="text-danger">Podano nieprawidłową wartość oceny</p> : ""}
                  {incorrectDataWeight ? <p className="text-danger">Podano nieprawidłową wartość wagi</p> : ""}
              </form>
              :
              <button className="btn btn-primary" onClick={handleOnClickAddSubject}>Dodaj przedmiot</button>
          }

          <br/><br/>
          <table className="table">
              <thead key="header">
                  <th>przedmiot</th>
                  <th>oceny</th>
                  <th>wagi</th>
                  <th>średnia ocen</th>
              </thead>
              {wiersze}
          </table>
      </>
    );
}