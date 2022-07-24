import type { NextPage } from 'next'
import { useState } from 'react';
import { setFlagsFromString } from 'v8';
import styles from '../styles/Home.module.css'
import { presidentes } from '../utils/presidentes';

const Home: NextPage = () => {
  const [numberUm, setNumberUm] = useState(-1);
  const [numberDois, setNumberDois] = useState(-1);
  const [presidenteArea, setPresidenteArea] = useState(false);
  const [invalido, setInvalido] = useState(false);
  const [fim, setFim] = useState(false);

  const [lula, setLula] = useState(0);
  const [bolso, setBolso] = useState(0);

  const [result, setResult] = useState(false);
  const [valFinal, setValFinal] = useState(0);

  const numbers = [
    {number: 1},
    {number: 2},
    {number: 3},
    {number: 4},
    {number: 5},
    {number: 6},
    {number: 7},
    {number: 8},
    {number: 9},
    {number: 0},
  ]

  const numberUmVal = () => {
    if(numberUm < 0 ) { return ('')
    } else {
      return (numberUm)
    }
  }
  const numberDoisVal = () => {
    if(numberDois < 0 ) { return ('')
    } else {
      return (numberDois)
    }
  }

  const confirmaAcao = () => {
    numberUm === 0 && numberDois === 0 || 
    numberUm === 1 && numberDois === 3 || 
    numberUm === 2 && numberDois === 2 ? 
    setPresidenteArea(true) : setInvalido(true);

   if(presidenteArea && !fim) {
    setPresidenteArea(false);
    setFim(true);
   } else if(!presidenteArea && fim) {
    setPresidenteArea(false)
    setInvalido(true)
   }

   numberUm === 1 && numberDois === 3 ? setLula(lula + 1) : '';
   numberUm === 2 && numberDois === 2 ? setBolso(bolso + 1) : '';
  }

  const brancoAcao = () => {
    if(!fim && !result) {
      setNumberUm(0),setNumberDois(0), numberUm === -1 || 0 && numberDois === -1 || 0 && !fim ? setPresidenteArea(true) : ''
    }
  }

  const resultadoAcao = () => {
    setFim(false)
    setInvalido(false)
    setPresidenteArea(false)
    setResult(!result)
    setNumberUm(-1)
    setNumberDois(-1)

    if(lula > bolso) {
      setValFinal(2)
    } else {
      setValFinal(1)
    }
  }

  return (
    <div className={styles.container}>
      <div style={{color: 'black', marginBottom: '10px', border: '1px solid black', padding: '4px', cursor: 'pointer'}}
            onClick={() => resultadoAcao()}
      >
        resultado
      </div>
      <div className={styles.corpoUrna}>
        <div className={styles.telaArea}>
          <div className={styles.tela}>

          {!presidenteArea && !fim && !result &&
            <div className={styles.areaTela}>
              <div className={styles.numbersEleitor}>
                <div>{numberUmVal()}</div>
                <div>{numberDoisVal()}</div>
              </div>
            </div>
            }

          {presidenteArea &&
          <>
            {presidentes.map((item, index) => (
              <>
              {item.numero === numberUm && item.numero2 === numberDois ? 
                <div className={styles.candidatoTela}>
                  <div className={styles.candidatoInfos}>
                    SEU VOTO PARA: <strong>PRESIDENTE</strong><br/><br/>
                    <div>Número: <p className={styles.numeroVoto}>{item.numero}</p><p className={styles.numeroVoto}>{item.numero2}</p></div>
                    <div>Nome: {item.nome}</div>
                    <div>Partido: <p style={{fontWeight: 'bold', marginLeft: '5px'}}>{item.partido}</p></div>
                  </div>
                  <div className={styles.candidatoImg}>
                    <div className={styles.imagem}>
                      <img src={item.img} alt="" />
                    </div>
                  </div>
                  <div className={styles.confirmacaoInfos}>
                    Aperte a Tecla<br/>
                    VERDE para CONFIRMAR<br/>
                    LARANJA para CORRIGIR
                  </div>
                </div>
              : <div></div>}
              </>
            ))}
            </>
          }

          {invalido && !fim &&
            <div style={{color: 'black', position: 'absolute', marginLeft: '200px'}}>CANDIDATO NÃO ENCONTRADO</div>
          }

          {fim &&
            <div className={styles.votoFim}>
              FIM
            </div>
          }

          {result && 
            <div style={{color: 'black', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
              <p>VENCEDOR</p>
              <img style={{width: '200px'}} src={presidentes[valFinal].img} alt="" />
              <h4>{presidentes[valFinal].nome}</h4>
            </div>
          }

          </div>
        </div>
        <div className={styles.botoesArea}>
          <div className={styles.logo}>
            <div className={styles.logoImg}>
              <img src='https://www.tre-ba.jus.br/++theme++justica_eleitoral/imagens/legislacao/brasao.jpg' alt="" />
            </div>
            <div className={styles.justica}>
              JUSTIÇA<br/>
              ELEITORAL
            </div>
          </div>
          <div className={styles.botoes}>
            <div className={styles.botoesNumbers}>
              {numbers.map((item, index) => (
                <div 
                  className={styles.number}
                  onClick={() => {numberUm < 0 ? setNumberUm(item.number) : numberUm >= 0 && numberDois <= -1 ? setNumberDois(item.number) : '' }}
                >{item.number}</div>
              ))}
            </div>
            <div className={styles.botoesConfir}>
              <div onClick={() => brancoAcao()}>BRANCO</div>
              <div style={{backgroundColor: 'rgb(216, 140, 0)'}} 
                  onClick={() => {setNumberUm(-1); setNumberDois(-1); setPresidenteArea(false); setInvalido(false)}}
              >CORRIGE</div>
              <div 
                className={styles.botaoConfirma}
                onClick={() => confirmaAcao()}
              >CONFIRMA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
