export const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    const formattedDate = new Date(dateTimeString).toLocaleString('en-US', options);
    return formattedDate;
  };