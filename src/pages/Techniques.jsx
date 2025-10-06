// pages/Techniques.jsx
export const Techniques = () => {
  return (
    <div className="pt-16 min-h-screen"> {/* pt-16 to account for fixed navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">ITF Techniques</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="hover-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-3">Stances (Sogi)</h3>
            <p className="text-foreground/80 mb-4">Basic stances and their applications in patterns and sparring</p>
            <ul className="text-foreground/70 text-sm space-y-1">
              <li>• Walking Stance (Gunnun Sogi)</li>
              <li>• Sitting Stance (Annun Sogi)</li>
              <li>• L-Stance (Niunja Sogi)</li>
              <li>• Fixed Stance (Gojung Sogi)</li>
            </ul>
          </div>
          
          <div className="hover-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-3">Blocks (Makgi)</h3>
            <p className="text-foreground/80 mb-4">Various blocking techniques for defense</p>
            <ul className="text-foreground/70 text-sm space-y-1">
              <li>• Low Block (Najunde Makgi)</li>
              <li>• Middle Block (Kaunde Makgi)</li>
              <li>• High Block (Nopunde Makgi)</li>
              <li>• Knifehand Block (Sonnal Makgi)</li>
            </ul>
          </div>
          
          <div className="hover-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-3">Strikes (Jireugi)</h3>
            <p className="text-foreground/80 mb-4">Hand and arm striking techniques</p>
            <ul className="text-foreground/70 text-sm space-y-1">
              <li>• Straight Punch (Jireugi)</li>
              <li>• Reverse Punch (Bandae Jireugi)</li>
              <li>• Knifehand Strike (Sonnal Taerigi)</li>
              <li>• Ridgehand Strike (Sonnal-deung Taerigi)</li>
            </ul>
          </div>
          
          <div className="hover-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-3">Kicks (Chagi)</h3>
            <p className="text-foreground/80 mb-4">Fundamental kicking techniques</p>
            <ul className="text-foreground/70 text-sm space-y-1">
              <li>• Front Kick (Ap Chagi)</li>
              <li>• Side Kick (Yop Chagi)</li>
              <li>• Turning Kick (Dollyo Chagi)</li>
              <li>• Back Kick (Dwit Chagi)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};