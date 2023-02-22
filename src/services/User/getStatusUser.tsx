export const getStatusUser = async (...props: any) => {
  const uri = 'http://localhost:8080/status/cpf';
  try {
    const response = await fetch(
      uri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props[0]),
    })
    const jsonObj = await response.json();
    return jsonObj
  } catch (error) {
    console.error(error);
  }
};