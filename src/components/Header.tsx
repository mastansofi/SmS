import React from 'react';

interface HeaderProps {
  variant?: 'standard' | 'back' | 'autonomous';
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  activeRole?: 'post' | 'work';
  onRoleChange?: (role: 'post' | 'work') => void;
  onProfileClick?: () => void;
  unreadCount?: number;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  variant = 'standard',
  title = 'Post Task',
  subtitle,
  onBack,
  activeRole = 'work',
  onRoleChange,
  onProfileClick,
  unreadCount = 2,
  rightAction,
}) => {
  const logoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1WDJieDRDmAHDLDYz2DyBi9ypj9nRU4uL9rX7WZnJNiqxuddmyrpjfGoc2yXv3ugGIvWpmVqhW9WudKDm6lvv4IQ5JePmd320opCh5Rql7VvtJo1D47XgmMi9lDYVlYZS7w018GVT8HmaOb4XPNZQXlHUFjKE0rWWMNkz4andrRYQBVOo23-av2yzwmDyKoDg9-hu7tfzG20CGeARWedBsgwPe6vkNXNVkoHt1NVJQ';
  const profileAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCMdzCgXJcLzvouZT5yApemhAYH5Cn5lw7fytLijsLKyUqPlr57_zfARmg4crAUd9XVbuz0yL09dwTPgQOPJnZbUOC1jgJb6GcGXLEgzq_uRvZs92UIYSsqezqBVkJ-Ba69kGdWQEmetY5_illj5qEnOwrJqqDxmtVxUHibtjPWftAMFKZ9xognguEQjdX8ZQ5XivjAQ6ZsQdVKZp4KXS5wMkDH6WDut8L3SYrH7ec';

  if (variant === 'back') {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-[#f8f9ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e5eeff]/80">
        <div className="h-16 px-4 max-w-lg mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Back"
                className="w-10 h-10 -ml-1 flex items-center justify-center text-[#0b1c30] hover:bg-[#eff4ff] active:scale-95 rounded-full transition-all shrink-0"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
            )}
            <img src={logoUrl} alt="SmS Logo" className="h-7 w-auto object-contain shrink-0" />
            <div className="flex flex-col ml-1 truncate">
              <h1 className="font-headline text-[17px] font-bold text-[#0b1c30] leading-tight truncate">
                {title}
              </h1>
              {subtitle && (
                <span className="text-[11px] text-[#45464d] font-normal leading-none truncate">
                  {subtitle}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {rightAction}
            <button
              type="button"
              onClick={onProfileClick}
              aria-label="User Profile"
              className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#e5eeff] hover:ring-[#006c4a] transition-all ml-1"
            >
              <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f8f9ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e5eeff]/80">
      <div className="h-16 px-4 max-w-lg mx-auto flex items-center justify-between gap-2">
        {/* Brand Zone */}
        <div className="flex items-center gap-1.5">
          <img src={logoUrl} alt="SmS Logo" className="h-8 w-auto object-contain" />
          <div className="flex flex-col ml-0.5">
            <span className="font-headline text-[17px] tracking-tight text-[#0b1c30] font-extrabold leading-none">
              SmS
            </span>
            {variant === 'autonomous' ? (
              <span className="text-[10px] text-[#006c4a] font-semibold leading-none mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c4a] animate-pulse"></span>
                Autonomous
              </span>
            ) : (
              <span className="text-[10px] text-[#45464d] leading-none hidden sm:inline mt-0.5">
                Every Work, Every Person
              </span>
            )}
          </div>
        </div>

        {/* Post / Work Switcher */}
        <div className="flex items-center bg-[#dce9ff] rounded-full p-0.5 shadow-inner">
          <button
            type="button"
            onClick={() => onRoleChange?.('post')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeRole === 'post'
                ? 'bg-white text-[#0b1c30] shadow-[0_1px_3px_rgba(15,23,42,0.12)]'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            Post
          </button>
          <button
            type="button"
            onClick={() => onRoleChange?.('work')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeRole === 'work'
                ? 'bg-white text-[#0b1c30] shadow-[0_1px_3px_rgba(15,23,42,0.12)]'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            Work
          </button>
        </div>

        {/* Notifications & Profile */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Notifications"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#f8f9ff]"></span>
            )}
          </button>

          <button
            type="button"
            onClick={onProfileClick}
            aria-label="User Profile"
            className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#e5eeff] hover:ring-[#006c4a] transition-all"
          >
            <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
};
