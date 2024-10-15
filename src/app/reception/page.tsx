'use client';

import React, { useEffect, useState } from 'react';
import './styles.css';
import { getPedidos, getEnderecoPorUsuario } from '../services/pedidosService'; 

const Reception = () => {
  const [pedidos, setPedidos] = useState<any[]>([]); 
  const [enderecos, setEnderecos] = useState<{ [key: number]: string }>({}); 

  useEffect(() => {
    
    const fetchPedidos = async () => {
      const pedidosData = await getPedidos(); 
      setPedidos(pedidosData);

      const enderecoMap: { [key: number]: string } = {};
      for (const pedido of pedidosData) {
        const cpf = pedido.cpf; 
        if (cpf) { 
          const enderecoData = await getEnderecoPorUsuario(cpf); 
          enderecoMap[pedido.id] = enderecoData ? enderecoData : 'Endereço não disponível'; 
        } else {
          enderecoMap[pedido.id] = 'CPF não disponível'; 
        }
      }

      setEnderecos(enderecoMap); 
    };

    fetchPedidos();
  }, []);

  const downloadPedido = async (id: number) => {
    try {
      const response = await fetch(`/api/download-pedido/${id}`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pedido_${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        alert('Falha ao gerar o PDF. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      alert('Ocorreu um erro ao tentar gerar o PDF.');
    }
  };

  return (
    <div className="reception-container">
      <img src="https://media.licdn.com/dms/image/v2/D4D0BAQE-pAEH-IZe5w/company-logo_200_200/company-logo_200_200/0/1700770947255/tdnow_logo?e=2147483647&v=beta&t=MrFeyP8u0yOb0wkl1GfCs3kK2_hx95jw7_loN7CdLkM" alt="Logo" className="logo" />
      <h1>Pedidos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DataHora</th>
            <th>Valor</th>
            <th>Local</th>
            <th>Pedido</th>
            <th>Entregue</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id} id={`pedido-${p.id}`}>
              <td data-label="ID">{p.id}</td>
              <td data-label="DataHora">{p.dataHora}</td>
              <td data-label="Valor">{p.valor}</td>
              <td data-label="Local">{enderecos[p.id] || 'Endereço não disponível'}</td>
              <td data-label="Pedido">{p.pedido}</td>
              <td data-label="Entregue"><input type="checkbox" /></td>
              <td data-label="Ações">
                <button className="print-button" onClick={() => downloadPedido(p.id)}>
                  Imprimir Pedido
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reception;
