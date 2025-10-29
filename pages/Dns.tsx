import React from 'react';
import { DnsRecord } from '../types';

const dnsRecords: DnsRecord[] = [
    { entry: '.', type: 'A', content: '76.76.21.21' },
    { entry: 'www', type: 'CNAME', content: 'cname.vercel-dns.com' },
    { entry: '_domainconnect', type: 'CNAME', content: 'domainconnect.locaweb.com.br' },
    { entry: 'ftp', type: 'CNAME', content: 'mranderson.tech' },
    { entry: '.', type: 'NS', content: ['ns1.locaweb.com.br', 'ns2.locaweb.com.br', 'ns3.locaweb.com.br'] },
    { entry: '.', type: 'SOA', content: 'ns1.locaweb.com.br. postmaster.locaweb.com.br. 2025100301 3600 600 1209600 3600' },
    { entry: '_acme-challenge.www', type: 'TXT', content: '"4wjnxkE499yxkwWLhENxRn_Eqt0hkPvlUblkjTw6no"' },
    { entry: '_acme-challenge', type: 'TXT', content: '"uUkjcjZ_Q1fBhvGBQ7uwbvhSeeCdcfePDp8bwNMWA3I"' },
];

const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


const Dns: React.FC = () => {
    return (
        <div className="bg-white text-gray-800 antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <header className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Entradas de DNS</h1>
                    <button className="px-5 py-2.5 bg-[#E51D4F] text-white text-sm font-semibold rounded-md shadow-sm hover:bg-red-700 transition-colors self-start md:self-center">
                        Adicionar Entrada
                    </button>
                </header>

                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Entrada</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Conteúdo</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dnsRecords.map((record, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{record.entry}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{record.type}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                                                {Array.isArray(record.content) ? (
                                                    <div className="flex flex-col">
                                                        {record.content.map((c, i) => <span key={i}>{c}</span>)}
                                                    </div>
                                                ) : (
                                                    record.content
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-4">
                                                    <button className="text-gray-400 hover:text-blue-600 transition-colors"><PencilIcon /></button>
                                                    <button className="text-gray-400 hover:text-red-600 transition-colors"><TrashIcon /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <footer className="flex items-center justify-end gap-6 pt-6 text-sm text-gray-600 border-t border-gray-200 mt-1">
                     <div className="flex items-center gap-2">
                        <span>Itens por Página</span>
                        <select className="border border-gray-300 rounded-md p-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option>15</option>
                            <option>30</option>
                            <option>50</option>
                        </select>
                    </div>
                    <span>1-8 de 8</span>
                    <div className="flex items-center gap-2">
                        <button disabled className="text-gray-300 cursor-not-allowed">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                         <button disabled className="text-gray-300 cursor-not-allowed">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Dns;