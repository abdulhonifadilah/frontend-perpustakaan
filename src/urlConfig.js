const baseUrl = process.env.API || 'http://localhost:4000';

export const api = `${baseUrl}`;

// export const generatePublicUrl = (fileName)=>{
//     return `${baseUrl}/${fileName}`;
// }