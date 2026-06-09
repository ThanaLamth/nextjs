import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="font-display font-bold text-8xl gradient-text mb-4">404</p>
      <h1 className="font-display font-bold text-2xl text-white mb-3">Page Not Found</h1>
      <p className="text-brand-gray-50 text-sm mb-8 max-w-sm">
        The page you&#39;re looking for doesn&#39;t exist or has been moved.
      </p>
      <Link href="/" className="bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold px-6 py-3 rounded-lg transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
