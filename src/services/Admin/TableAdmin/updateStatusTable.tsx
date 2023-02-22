export const updateStatusTableAdmin = async (...props: any) => {
  const uri = 'http://localhost:8080/status/status/update/admin';
  try {
    const response = await fetch(
      uri, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props[0]),
    })
    if (response.ok) {
      console.log("Status successfully update")
    }
  } catch (error) {
    console.error(error);
  }
};