'use client';
export default function Loader() {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <style jsx>{`
                .loader-container {
                    position: absolute;
                    top: 0;
                    left: 00;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(255, 255, 255, 0.8);
                    z-index: 9999;
                }

                .loader {
                    border: 6px solid #f3f3f3;
                    border-top: 6px solid #3498db; /* Blue color */
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}
