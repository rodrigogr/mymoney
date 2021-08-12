import styled from "styled-components";

export const Container = styled.div`
    margin-top: -5rem;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    display: grid;
    
    div {
        background: var(--shape);
        color: var(--text-title);
        border-radius: 0.25rem;
        padding: 1rem 2rem;

        header {
            font-size: 1rem;
            margin: 0.5rem auto;
            display: flex;
            justify-content: space-between;
        }

        strong {
            font-size: 2rem;
            font-weight: normal;
            display: block;
        }
        &.total-background {
            background: var(--green);
            color: var(--shape);
        }
    }
`;