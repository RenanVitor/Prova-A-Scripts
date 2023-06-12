import styled from "styled-components";
import { useEffect, useState } from "react";
import { UfProps } from "../types";
import ufService from "../services/Uf";

export default function Principal() {
  const [sigla, setSigla] = useState("");
  const [nome, setNome] = useState("");
  const [data, setData] = useState<UfProps[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ufService.list();
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const enviarUF = async () => {
    try {
      await ufService.create({ sigla, nome });
      setSigla("");
      setNome("");
      setErro("");
      fetchData();
    } catch (error: any) {
      setErro(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await ufService.list();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BoxSld>
      <TitleSld>UF</TitleSld>
      <LabelSld>Sigla</LabelSld>
      <InputSld value={sigla} onChange={(e) => setSigla(e.target.value)} />
      <LabelSld>Nome</LabelSld>
      <InputSld value={nome} onChange={(e) => setNome(e.target.value)} />
      {erro && <AlertBox>{erro}</AlertBox>}
      <SaveButton onClick={enviarUF}>Salvar</SaveButton>
      <ResultBox>
        {data.map((item) => (
          <p key={item.id}>
            {item.nome} - {item.sigla}
          </p>
        ))}
      </ResultBox>
    </BoxSld>
  );
}

const BoxSld = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  margin: 0px 10px;
  border: 1px solid ${(props) => props.theme.borda};
  border-radius: 10px;
  box-sizing: border-box;
  margin-top: 20px;
  height: 500px; // Altura máxima do componente
  overflow-y: auto; // Adiciona uma barra de rolagem vertical quando necessário
`;

const TitleSld = styled.h4`
  margin: 0px;
  font-weight: bold;
`;

const LabelSld = styled.label`
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 2px;
`;

const InputSld = styled.input.attrs({ type: "text" })`
  padding: 8px;
  color: #d2691e;
  font-weight: bold;
  border: 1px solid #999;
  border-radius: 5px;
`;

const AlertBox = styled.div`
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 2px;
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
`;

const SaveButton = styled.button`
  padding: 8px 16px;
  background-color: #d2691e;
  color: #fff;
  border: #999;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  font-weight: bold;
`;
const ResultBox = styled.div`
  font-size: 15px;
  background-color: #fff;
  color: #d2691e;
  border-radius: 5px;
  max-height: 200px;
  p {
    margin: 15px 0;
  }
`;


