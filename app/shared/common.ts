export const convertTimeStamps = (data: string) => {
    const inputDate = new Date(data);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
    return formattedDate;   
};
