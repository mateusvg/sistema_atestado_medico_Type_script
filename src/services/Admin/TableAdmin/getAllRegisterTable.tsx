export const getAllRegistersAdmin = async () => {
    const uri = 'http://localhost:8080/admin/table';
    try {
      const response = await fetch(
        uri, {
        method: 'GET',

      })
      const jsonObj = await response.json();
      return jsonObj
    } catch (error) {
      console.error(error);
    }
  };