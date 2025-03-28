function BanList({ banList, onRemove }) {
    return (
      <div className="ban-list">
        <h3>Banished</h3>
        {Object.entries(banList).map(([category, values]) => (
          values.length > 0 && (
            <div key={category}>
              <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
              <ul>
                {values.map((item) => (
                  <li
                    key={item}
                    className="banned-item"
                    onClick={() => onRemove(category, item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    );
  }
  
export default BanList;