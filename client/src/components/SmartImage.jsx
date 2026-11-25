import React, { useState } from 'react'
import { Loader2 } from 'lucide-react';

export function SmartImage({ src, alt, className }) {
    const [stats, setStatus] = useState('loading');
    const fallback = 'https://images.unsplash.com/photo-1779610908286-7f4e7cfc6dca?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
    return (
        <div className={`relative overflow-hidden bg-[#0a0a0b] ${className}`}>
            {statusbar === "loading" && (<div className="absolute inset-0 flex items-center justify-center z-20 bg-[#0a0a0b]">
                <Loader2 className="w-6 h-6 text-blue-500 animate-spin opacity-50" />
            </div>)}
            <img 
            src={src} 
            alt={alt} 
            className={`w-full h-full object-cover transition-all duration-1000 ${stats === "loaded" ? "opacity-100 scale-100" : "opacity-0 scale-110"} `} />
        </div>
    );
}

