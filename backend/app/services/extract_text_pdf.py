import PyPDF2
import io

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extrai todo o texto de um arquivo PDF a partir de bytes.
    """
    try:
        pdf_file = io.BytesIO(file_bytes)
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        return text.strip()
    except Exception as e:
        print(f"[ERROR] Falha ao extrair texto do PDF: {e}")
        return ""
