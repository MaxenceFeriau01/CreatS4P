/* ─── Composant réutilisable : fond animé sur toute la page ─── */
/* Usage : importer et placer en premier enfant du container principal */

const BG_CSS = `
@keyframes floatA {
  0%,100% { transform:translate(0,0) scale(1); }
  50%     { transform:translate(20px,-30px) scale(1.08); }
}
@keyframes floatB {
  0%,100% { transform:translate(0,0) scale(1); }
  50%     { transform:translate(-25px,20px) scale(1.05); }
}
@keyframes floatC {
  0%,100% { transform:translate(0,0) rotate(0deg); }
  50%     { transform:translate(15px,-15px) rotate(25deg); }
}
@keyframes floatD {
  0%,100% { transform:translate(0,0) scale(1); }
  50%     { transform:translate(-15px,-25px) scale(1.1); }
}
@keyframes floatE {
  0%,100% { transform:translate(0,0); }
  33%     { transform:translate(18px,-12px); }
  66%     { transform:translate(-10px,18px); }
}
@keyframes spinSlow {
  from { transform:rotate(0deg); }
  to   { transform:rotate(360deg); }
}
`

let injected = false

export default function PageBackground() {
  if (!injected) {
    injected = true
    if (typeof document !== 'undefined' && !document.getElementById('bg-kf')) {
      const s = document.createElement('style')
      s.id = 'bg-kf'
      s.textContent = BG_CSS
      document.head.appendChild(s)
    }
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, overflow:'hidden', pointerEvents:'none' }}>
      {/* Grand cercle vert haut gauche */}
      <div style={{ animation:'floatA 8s ease-in-out infinite', position:'absolute', top:-80, left:-80, width:320, height:320, borderRadius:'50%', background:'rgba(16,185,129,0.18)' }}/>
      {/* Cercle orange haut droite */}
      <div style={{ animation:'floatB 10s ease-in-out infinite', position:'absolute', top:-60, right:-60, width:260, height:260, borderRadius:'50%', background:'rgba(249,115,22,0.15)' }}/>
      {/* Cercle émeraude milieu gauche */}
      <div style={{ animation:'floatC 7s ease-in-out infinite', position:'absolute', top:'35%', left:-60, width:200, height:200, borderRadius:'50%', background:'rgba(5,150,105,0.13)' }}/>
      {/* Cercle jaune milieu droite */}
      <div style={{ animation:'floatD 9s ease-in-out infinite', position:'absolute', top:'40%', right:-50, width:180, height:180, borderRadius:'50%', background:'rgba(234,179,8,0.15)' }}/>
      {/* Cercle rose bas gauche */}
      <div style={{ animation:'floatE 11s ease-in-out infinite', position:'absolute', bottom:-60, left:-40, width:240, height:240, borderRadius:'50%', background:'rgba(236,72,153,0.1)' }}/>
      {/* Cercle bleu bas droite */}
      <div style={{ animation:'floatA 12s ease-in-out infinite', position:'absolute', bottom:-80, right:-60, width:280, height:280, borderRadius:'50%', background:'rgba(59,130,246,0.12)' }}/>
      {/* Petit cercle orange centre haut */}
      <div style={{ animation:'floatB 6s ease-in-out infinite', position:'absolute', top:'15%', left:'55%', width:80, height:80, borderRadius:'50%', background:'rgba(249,115,22,0.18)' }}/>
      {/* Petit cercle vert centre bas */}
      <div style={{ animation:'floatC 8s ease-in-out infinite', position:'absolute', bottom:'20%', left:'60%', width:60, height:60, borderRadius:'50%', background:'rgba(16,185,129,0.2)' }}/>
      {/* Anneau tournant haut droite */}
      <div style={{ animation:'spinSlow 20s linear infinite', position:'absolute', top:40, right:40, width:120, height:120, borderRadius:'50%', border:'3px dashed rgba(16,185,129,0.25)' }}/>
      {/* Anneau tournant bas gauche */}
      <div style={{ animation:'spinSlow 15s linear infinite reverse', position:'absolute', bottom:100, left:30, width:90, height:90, borderRadius:'50%', border:'3px dashed rgba(249,115,22,0.22)' }}/>
    </div>
  )
}