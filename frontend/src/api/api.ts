import axios from "axios";

axios.defaults.withCredentials = true;

// BASE URL

const PdfUrl = "http://localhost:3000/api/pdf/v3";

// API TO UPLOAD PDF

export const uploadPdf = async (pdf: FormData): Promise<void> => {
    console.log(pdf);

    try {
        const response = await axios.post(`${PdfUrl}/upload`, pdf, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.log('Error:', err.response ? err.response.data : err.message);
        } else {
            console.log('Unexpected error:', err);
        }
    }
}
