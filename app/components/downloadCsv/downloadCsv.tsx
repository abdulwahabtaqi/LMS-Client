import { Button } from 'primereact/button';

const DownloadCsv: React.FC = () => {
    return (
        <div className="mx-auto mt-4">
            <div className="grid p-fluid d-flex justify-content-start">
                <div className="field col-6 md:col-6 bg-info">
                    <a href="/csvFiles/sample_csv_template.csv" download>
                        <Button className="w-max ">Download Sample CSV</Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DownloadCsv;
