'use client';

import React, { useEffect, useState } from 'react';
import './styles.css';
import { getPedidos, getEnderecoPorUsuario } from '../services/pedidosService'; 

const Reception = () => {
  const [pedidos, setPedidos] = useState<any[]>([]); 
  const [enderecos, setEnderecos] = useState<{ [key: number]: any }>({}); 

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const pedidosData = await getPedidos(); 
        setPedidos(pedidosData);

        if (!pedidosData || pedidosData.length === 0) {
          return; 
        }

        const enderecoMap: { [key: number]: any } = {};
        const enderecoPromises = pedidosData.map(async (pedido: { id: number; user_cpf: string; pedido_id: number }) => {
          const cpf = pedido.user_cpf;
          if (cpf) { 
            const enderecoData = await getEnderecoPorUsuario(cpf); 
            enderecoMap[pedido.pedido_id] = enderecoData || 'Endereço não disponível'; 
          } else {
            enderecoMap[pedido.pedido_id] = 'CPF não disponível'; 
          }
        });

        await Promise.all(enderecoPromises);
        setEnderecos(enderecoMap);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
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
            <th>Pedidos</th>
            <th>Local</th>
            <th>Total</th>
            <th>Entregue</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
        {pedidos.map((p) => {
          const pizzaNomes = p.pizzas[0].pizza_nome.split(',');
          const pizzaTamanhos = p.pizzas[0].pizza_tamanho.split(',');
          const pizzaQuantidades = p.pizzas[0].quantidade.split(',');

          return (
            <tr key={p.pedido_id} id={`pedido-${p.pedido_id}`}>
              <td data-label="ID">{p.pedido_id}</td>
              <td data-label="Pedidos">
                {pizzaNomes.map((nome: string, index: number) => (
                  <div key={index}>
                    {`${pizzaQuantidades[index]}x ${nome} (${pizzaTamanhos[index]})`}
                  </div>
                ))}
              </td>
              <td data-label="Local">
                {typeof enderecos[p.pedido_id] === 'object'
                  ? `${enderecos[p.pedido_id]?.rua}, ${enderecos[p.pedido_id]?.numero} - ${enderecos[p.pedido_id]?.bairro}`
                  : enderecos[p.pedido_id] || 'Endereço não disponível'}
              </td>
              <td data-label="Total">
                {`R$ ${parseFloat(p.total_compra).toFixed(2)}`}
              </td>
              <td data-label="Entregue"><input type="checkbox" /></td>
              <td data-label="Ações">
                <button className="print-button" onClick={() => downloadPedido(p.pedido_id)}>
                  Imprimir Pedido
                </button>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}

export default Reception;
