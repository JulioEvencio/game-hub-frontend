function ButtonDownloadComponent({ url, downloadInfo }) {
    return(
        <a href={url} target='_blank' rel='noopener noreferrer'  download={downloadInfo}>
            <button>Download</button>
        </a>
    )
}

export default ButtonDownloadComponent
