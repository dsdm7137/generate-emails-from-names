import { useState } from 'react';

interface EmailResult {
  name: string;
  email: string;
}

export function App() {
  const [namesInput, setNamesInput] = useState('');
  const [emailFormat, setEmailFormat] = useState('firstname.lastname@company.com');
  const [results, setResults] = useState<EmailResult[]>([]);
  const [copied, setCopied] = useState(false);

  const parseEmailFormat = (format: string) => {
    // Extract domain from format
    const atIndex = format.indexOf('@');
    if (atIndex === -1) return null;
    
    const domain = format.substring(atIndex + 1);
    const pattern = format.substring(0, atIndex);
    
    return { pattern, domain };
  };

  const generateEmail = (name: string, format: string): string => {
    const parsed = parseEmailFormat(format);
    if (!parsed) return '';
    
    const { pattern, domain } = parsed;
    const nameParts = name.trim().split(/\s+/);
    
    if (nameParts.length === 0) return '';
    
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    const middleName = nameParts.length > 2 ? nameParts[1] : '';
    
    let emailPrefix = pattern
      .replace(/firstname/gi, firstName)
      .replace(/lastname/gi, lastName)
      .replace(/middlename/gi, middleName)
      .replace(/first/gi, firstName)
      .replace(/last/gi, lastName)
      .replace(/middle/gi, middleName)
      .replace(/f/g, firstName.charAt(0))
      .replace(/l/g, lastName.charAt(0))
      .replace(/m/g, middleName.charAt(0));
    
    // Clean up the email prefix (remove special chars, convert to lowercase)
    emailPrefix = emailPrefix.toLowerCase().replace(/[^a-z0-9._-]/g, '');
    
    return `${emailPrefix}@${domain}`;
  };

  const handleGenerate = () => {
    const names = namesInput
      .split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    const generatedEmails = names.map(name => ({
      name,
      email: generateEmail(name, emailFormat)
    }));
    
    setResults(generatedEmails);
  };

  const handleCopyAll = () => {
    const emailsList = results.map(r => r.email).join('\n');
    navigator.clipboard.writeText(emailsList);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySingle = (email: string) => {
    navigator.clipboard.writeText(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Email Generator</h1>
          <p className="mt-2 text-slate-600">Generate email addresses from names using custom formats</p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Names Input */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Names (comma-separated)
              </label>
              <textarea
                value={namesInput}
                onChange={(e) => setNamesInput(e.target.value)}
                placeholder="John Doe, Jane Smith, Robert Johnson, Mary Williams"
                className="w-full rounded-lg border border-slate-300 p-4 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                rows={4}
              />
            </div>

            {/* Email Format Input */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Format
              </label>
              <input
                type="text"
                value={emailFormat}
                onChange={(e) => setEmailFormat(e.target.value)}
                placeholder="firstname.lastname@company.com"
                className="w-full rounded-lg border border-slate-300 p-4 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <div className="mt-2 text-sm text-slate-500">
                <p className="font-medium">Available placeholders:</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs">firstname</span>
                  <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs">lastname</span>
                  <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs">f</span>
                  <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs">l</span>
                </div>
                <p className="mt-2 text-xs">
                  Examples: firstname.lastname@company.com, f.lastname@company.com, firstnamel@company.com
                </p>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl active:scale-[0.98]"
            >
              Generate Emails
            </button>
          </div>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="mt-8 border-t border-slate-200 pt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  Generated Emails ({results.length})
                </h2>
                <button
                  onClick={handleCopyAll}
                  className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  {copied ? (
                    <>
                      <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy All
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{result.name}</p>
                      <p className="font-mono text-sm text-indigo-600">{result.email}</p>
                    </div>
                    <button
                      onClick={() => handleCopySingle(result.email)}
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white hover:text-indigo-600"
                      title="Copy email"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-8 rounded-xl bg-white/60 p-6 backdrop-blur">
          <h3 className="mb-3 font-semibold text-slate-900">How to use:</h3>
          <ol className="space-y-2 text-sm text-slate-600">
            <li className="flex gap-2">
              <span className="font-semibold text-indigo-600">1.</span>
              <span>Enter comma-separated names (e.g., "John Doe, Jane Smith")</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-indigo-600">2.</span>
              <span>Customize the email format using placeholders like firstname, lastname, f (first initial), l (last initial)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-indigo-600">3.</span>
              <span>Click "Generate Emails" to create the email addresses</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-indigo-600">4.</span>
              <span>Copy individual emails or all emails at once</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
