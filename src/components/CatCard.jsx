function CatCard({ cat, onBanClick }) {

    const temperamentTraits = cat.temperament.split(',').map(t => t.trim());

    return (
        <div className="cat-card">
          <img src={cat.image} alt={`Cat: ${cat.name}`} />
            <p>
                <strong>Breed:</strong>{' '}
                <button onClick={() => onBanClick("breeds", cat.name)} className="ban-button">
                {cat.name}
                </button>
            </p>
            <p>
                <strong>Origin:</strong>{' '}
                <button onClick={() => onBanClick("origins", cat.origin)} className="ban-button">
                {cat.origin}
                </button>
            </p>
    
            <p><strong>Temperament:</strong></p>
            <div className="temperament-tags">
            {temperamentTraits.map((trait, index) => (
                <button
                    key={index}
                    onClick={() => onBanClick("temperaments", trait)}
                    className="ban-button"
                >
                    {trait}
                </button>
            ))}
          </div>
        </div>
      );
  }
  
export default CatCard;
  