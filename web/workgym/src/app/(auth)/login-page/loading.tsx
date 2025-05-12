export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 border-solid"></div>
                <h1 className="mt-2 text-sm font-semibold text-gray-400">Carregando...</h1>
            </div>
        </div>
    );
}
