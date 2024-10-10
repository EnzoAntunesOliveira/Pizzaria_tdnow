const getLogin = async (email, senha) => {
  try {
    const response = await fetch('https://3z0nnhl1-3000.brs.devtunnels.ms/login/entrar', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });
    const data = await response.json();
    if (response.ok) {
      window.location.replace('./reception');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("Erro ao fazer login", error);
    alert("Erro ao realizar o login. Por favor, tente novamente mais tarde");
  }
};

export default getLogin;
