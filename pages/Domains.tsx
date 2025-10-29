import React from 'react';

type DomainStatus = 'invalid' | 'warning' | 'valid';

interface Domain {
  name: string;
  status: DomainStatus;
  statusText: string;
  learnMore: boolean;
  target: string | { type: 'redirect'; code: number; url: string };
  buttons: ('Refresh' | 'Edit')[];
}

const domains: Domain[] = [
  {
    name: 'mranderson.tech',
    status: 'valid',
    statusText: 'Valid Configuration',
    learnMore: false,
    target: { type: 'redirect', code: 307, url: 'www.mranderson.tech' },
    buttons: ['Refresh', 'Edit'],
  },
  {
    name: 'www.mranderson.tech',
    status: 'valid',
    statusText: 'Valid Configuration',
    learnMore: false,
    target: 'Production',
    buttons: ['Refresh', 'Edit'],
  },
  {
    name: 'mranderson-tech.vercel.app',
    status: 'valid',
    statusText: 'Valid Configuration',
    learnMore: false,
    target: 'Production',
    buttons: ['Refresh', 'Edit'],
  },
];

const StatusIcon: React.FC<{ status: DomainStatus }> = ({ status }) => {
  switch (status) {
    case 'invalid':
      return (
        <div className="w-5 h-5 flex items-center justify-center">
             <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </div>
      );
    case 'warning':
    case 'valid':
      return (
        <div className="w-5 h-5 flex items-center justify-center bg-blue-500 rounded-full text-white">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      );
    default:
        return null;
  }
};

const StatusBadge: React.FC<{ status: DomainStatus, text: string }> = ({ status, text }) => {
    const baseClasses = "text-xs font-medium px-2 py-0.5 rounded-md";
    switch (status) {
        case 'invalid':
            return <span className={`${baseClasses} bg-red-800/80 text-red-300 border border-red-600/50`}>{text}</span>;
        case 'warning':
            return <span className={`${baseClasses} bg-yellow-800/80 text-yellow-300 border border-yellow-600/50`}>{text}</span>;
        case 'valid':
            return <span className="text-sm text-gray-400">{text}</span>;
        default:
            return null;
    }
}

const DomainRow: React.FC<{ domain: Domain }> = ({ domain }) => (
    <div className="bg-[#111111] border border-gray-800 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 flex flex-col gap-2 w-full md:w-auto">
            <div className="flex items-center gap-3">
                <StatusIcon status={domain.status} />
                <span className="font-semibold text-lg text-white">{domain.name}</span>
            </div>
             <div className="ml-8 flex items-center gap-2 flex-wrap">
                <StatusBadge status={domain.status} text={domain.statusText} />
                {domain.learnMore && (
                    <button className="text-sm text-gray-400 hover:text-white flex items-center">
                        Learn more
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
        </div>

        <div className="flex-1 flex items-center justify-start md:justify-center text-gray-400 text-sm w-full md:w-auto">
            {typeof domain.target === 'string' ? (
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>{domain.target}</span>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path></svg>
                     <span className="bg-gray-800 text-gray-300 text-xs font-mono px-2 py-1 rounded">{domain.target.code}</span>
                     <span>{domain.target.url}</span>
                </div>
            )}
        </div>

        <div className="flex items-center gap-2 self-end md:self-center">
            {domain.buttons.map(btn => (
                <button key={btn} className="px-4 h-9 bg-black border border-gray-700 text-white text-sm rounded-md hover:bg-gray-900/50 hover:border-gray-600 transition-colors">
                    {btn}
                </button>
            ))}
        </div>
    </div>
);


const Domains: React.FC = () => {
    return (
        <div className="bg-black text-white">
            <div className="max-w-5xl mx-auto p-4 md:p-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Domains</h1>
                        <p className="text-gray-400 mt-1">
                            Domains can be assigned to git branches, custom environments, and production.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 self-start md:self-center">
                        <button className="px-4 h-9 bg-black border border-gray-700 text-white text-sm font-semibold rounded-md hover:border-gray-500 transition-colors">
                            Buy Domain
                        </button>
                        <button className="px-4 h-9 bg-white text-black text-sm font-semibold rounded-md hover:bg-gray-200 transition-colors">
                            Add Domain
                        </button>
                    </div>
                </header>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 h-9 bg-black border border-gray-800 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 px-4 h-9 bg-black border border-gray-800 text-white text-sm font-semibold rounded-md hover:border-gray-600 transition-colors">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" />
                        </svg>
                        Filter
                    </button>
                </div>
                
                {/* Domain List */}
                <div className="space-y-4">
                    {domains.map(domain => (
                        <DomainRow key={domain.name} domain={domain} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Domains;