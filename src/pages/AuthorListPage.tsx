import React from 'react';
import { AUTHOR_PROFILES } from '../data';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';

interface AuthorListPageProps {
  onNavigate: (path: string) => void;
}

export function AuthorListPage({ onNavigate }: AuthorListPageProps) {
  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: 'Lumière レビュアー・編集メンバー紹介 | 専門コスメ部長プロフィール',
      description: '当サイトの夏コスメレビューを担当する男性コスメ部長・女性コスメ部長および専門執筆陣のプロフィール一覧です。',
      urlPath: '/authors'
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full uppercase tracking-wider mb-3">
              EDITORIAL TEAM & EXPERTS
            </span>
            <h1 className="text-2xl sm:text-4xl font-black leading-tight mb-3">
              当サイトの専門レビュアー・コスメ部長紹介
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              自ら購入・徹底検証を行う信頼のレビュアー陣。男性コスメ部長タクマと女性コスメ部長エリを中心に、実体感に基づいた本物の情報をお届けします。
            </p>
          </div>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AUTHOR_PROFILES.map((author) => (
            <div
              key={author.id}
              onClick={() => onNavigate(`/authors/${author.id}`)}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 cursor-pointer group"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={author.avatarUrl}
                  alt={author.avatarAlt || author.name}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-24 h-24 rounded-full border-2 border-amber-400 p-0.5 object-cover bg-white shadow-md group-hover:scale-105 transition-transform"
                />
                {author.isDepartmentHead && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                    コスメ部長
                  </span>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-indigo-600 transition">
                    {author.name}
                  </h3>
                  <p className="text-xs font-bold text-indigo-600">{author.role}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {author.bio}
                </p>

                <div className="pt-2 flex items-center justify-center sm:justify-start text-xs font-extrabold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  プロフィール・担当記事を見る ➔
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
