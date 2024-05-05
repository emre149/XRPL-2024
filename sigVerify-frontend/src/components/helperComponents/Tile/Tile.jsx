import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TileContainer = styled(Link)`
    min-width: 200px;
    min-height: 78px;
    background-color: #333;
    text-decoration: none;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #222;
    font-size: 40px !impo;
    &:hover {
        background-color: #fff;
    }
`;

const TileContent = styled.div`
    
`;

const TileIcon = styled.span`
    display: flex;
    justify-content: center;
`;

const TileTitle = styled.h2`
    font-size: 20px;
    margin: 0px;
    margin-top: 4px;
    font-weight: 800;
`;

const TileFinePrint = styled.p`
    position: relative;
    font-size: 6px;
    color: rgb(240, 79, 79);
    margin: 0px;
`;

function Tile({ title, icon, link, finePrint }) {
    return (
        <TileContainer to={link} className="buttonPop">
            <TileContent>
                <TileIcon>{icon}</TileIcon>
                <TileTitle>{title}</TileTitle>
                <TileFinePrint>{finePrint.length > 1 ? `${finePrint}` : ''}</TileFinePrint>
            </TileContent>
        </TileContainer>
    )
};

export default Tile;