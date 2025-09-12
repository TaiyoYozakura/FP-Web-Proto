import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <>
      <div className="bg-blue-900 text-white py-2 px-6 text-sm">
        <div className="container mx-auto flex justify-between">
          <span>📧 alumni@standrewscollege.ac.in | 📞 +91 22 2640 0348</span>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-yellow-300">Student Portal</Link>
            <Link href="#" className="hover:text-yellow-300">Faculty Portal</Link>
          </div>
        </div>
      </div>
      <nav className="bg-white shadow-md border-b-4 border-blue-900">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-4">
              <Image src="/SAC-LOGO.webp" alt="St Andrews College" width={80} height={80} />
              <div>
                <h1 className="text-2xl font-bold text-blue-900">ST. ANDREWS COLLEGE</h1>
                <p className="text-sm text-gray-600">BANDRA (WEST), MUMBAI</p>
                <p className="text-xs text-red-600 font-semibold">ALUMNI PORTAL</p>
              </div>
            </Link>
            <div className="flex space-x-8">
              <Link href="/dashboard" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Dashboard</Link>
              <Link href="/directory" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Directory</Link>
              <Link href="/events" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Events</Link>
              <Link href="/jobs" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Jobs</Link>
              <Link href="/news" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">News</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}