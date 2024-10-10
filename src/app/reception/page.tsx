'use client';

import React, { useEffect, useState } from 'react';
import './styles.css';
import receptionService from '../services/pedidosService'; 
import enderecoService from '../services/enderecoService';  

const Reception = () => {
  const [pedidos, setPedidos] = useState<any[]>([]); 
  const [enderecos, setEnderecos] = useState<{ [key: number]: string }>({}); 

  useEffect(() => {
    
    const fetchPedidos = async () => {
      const pedidosData = await receptionService.getPedidos(); 
      setPedidos(pedidosData);

      
      const enderecoMap: { [key: number]: string } = {};
      for (const pedido of pedidosData) {
        const enderecoData = await enderecoService.getPedidos(); 
        enderecoMap[pedido.id] = enderecoData; 
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
      <img src="tdnow.png" alt="Logo" className="logo" />
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
