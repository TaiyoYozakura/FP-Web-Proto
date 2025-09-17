'use client';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'avatar' | 'button';
  lines?: number;
}

export default function SkeletonLoader({ 
  className = "", 
  variant = 'text',
  lines = 1 
}: SkeletonProps) {
  const baseClasses = "skeleton rounded animate-pulse";
  
  const variants = {
    text: "h-4 bg-gray-200",
    card: "h-48 bg-gray-200 rounded-xl",
    avatar: "w-12 h-12 bg-gray-200 rounded-full",
    button: "h-10 bg-gray-200 rounded-lg"
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className={`${baseClasses} ${variants.text}`}
            style={{ width: i === lines - 1 ? '75%' : '100%' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <SkeletonLoader variant="avatar" />
      <SkeletonLoader variant="text" lines={3} />
      <SkeletonLoader variant="button" className="w-24" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <SkeletonLoader className="w-1/4" />
          <SkeletonLoader className="w-1/4" />
          <SkeletonLoader className="w-1/4" />
          <SkeletonLoader className="w-1/4" />
        </div>
      ))}
    </div>
  );
}