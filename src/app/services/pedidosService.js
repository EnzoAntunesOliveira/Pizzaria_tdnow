const getPedidos = async () => {
  try {
    const response = await fetch('https://3z0nnhl1-3000.brs.devtunnels.ms/pedidos/getAllOrder', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar pedidos: ${response.statusText}`);
    }

    const pedidos = await response.json();
    return pedidos;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
  }
};

const getEnderecoPorUsuario = async (cpf) => {
  try {
    const response = await fetch(`https://3z0nnhl1-3000.brs.devtunnels.ms/enderecos/${cpf}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar endereços: ${response.statusText}`);
    }

    const endereco = await response.json();
    return endereco;
  } catch (error) {
    console.error('Erro ao buscar endereços:', error);
    return null; 
  }
};

export { getPedidos, getEnderecoPorUsuario };
