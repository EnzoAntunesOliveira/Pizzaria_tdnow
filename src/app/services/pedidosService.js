const getPedidos = async () => {
    try {
      const response = await fetch('https://3z0nnhl1-3000.brs.devtunnels.ms/pedidos/getAllOrder', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar pedidos');
      }
  
      const data = await response.json();
      const usercpf = data.user_cpf;
      return data;
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      return [];
    }
  };

  

  export default {
    getPedidos,
  };
