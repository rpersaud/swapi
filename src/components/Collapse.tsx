import {useState, useEffect, MouseEvent } from 'react';

const Collapse = ({ item, collapsed, children }: any) => {

    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const [selectedCharacter, setSelectedCharacter] = useState({});

    useEffect(() => {
      if (selectedCharacter) {
        console.log('toon clicked', selectedCharacter);
      }
    }, [selectedCharacter]);

    const handleClick = (event: MouseEvent) => {
      setIsCollapsed(!isCollapsed);
      setSelectedCharacter((event?.target as HTMLButtonElement).innerHTML);
    }

    return (
      <>
        <button
          className={`collapse-button ${ !isCollapsed ? 'selected' : ''}`}
          onClick={handleClick}
        >
          {item.name}
        </button>
        <div
          className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
          aria-expanded={isCollapsed}
        >
          {children}
        </div>
      </>
    );
  };

  export default Collapse;