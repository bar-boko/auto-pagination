import { useState } from 'react';
import styled from '@emotion/styled';
import PaginationComponent from '.';

export default ({
    title: 'Pagination',
    component: PaginationComponent,
});

const Item = styled.span`
    display: block;
    background-color: #0857c3;
    color: white;
    font-size: 16pt;
    font-family: Arial, sans-serif;
    margin: 5px;
    border-radius: 10px;
    padding: 5px;
    box-sizing: border-box;
`;

const DemoChildren = () => (
    <>
        <Item>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Item>
        <Item>
            Earum tempora officia cum quas quae, aliquid ex.
        </Item>
        <Item>
            Hic fuga ex, reprehenderit animi suscipit nobis molestiae.
        </Item>
        <Item>
            Possimus, repellendus accusamus? Expedita quae veritatis dicta quos.
        </Item>
        <Item>
            Alias expedita exercitationem natus, voluptate mollitia excepturi obcaecati.
        </Item>
        <Item>
            Atque quod maiores dolore quaerat similique. Beatae, reiciendis?
        </Item>
        <Item>
            Repellendus inventore dicta, nulla error reprehenderit eius quo!
        </Item>
        <Item>
            Odit facilis nemo nostrum qui dolorum quidem placeat.
        </Item>
        <Item>
            Doloremque corporis est non debitis, saepe eos voluptates?
        </Item>
        <Item>
            Fuga nesciunt tempora, quis deserunt cum a odit.
        </Item>
        <Item>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium?
        </Item>
        <Item>
            Nobis iste, dolorem eveniet perspiciatis nostrum dignissimos modi consequuntur?
        </Item>
        <Item>
            Dolores cumque illum vero ea. Soluta cum vel ea.
        </Item>
        <Item>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, provident.
        </Item>
        <Item>
            Beatae adipisci ad et, aspernatur ipsa commodi nisi vel optio.
        </Item>
        <Item>
            Libero dignissimos optio vero amet laudantium officiis exercitationem eligendi eos!
        </Item>
        <Item>
            Hic minima nobis quo eligendi odit asperiores incidunt fugit dolore?
        </Item>
        <Item>
            Aperiam, amet quos. Possimus recusandae quas quis, ipsum voluptatum quam!
        </Item>
        <Item>
            Officia impedit porro odio error cum sunt placeat perspiciatis quia?
        </Item>
        <Item>
            Quae quo repudiandae officia blanditiis quidem? Vel veritatis deserunt amet!
        </Item>
        <Item>
            Soluta ullam laboriosam hic velit exercitationem totam tenetur. Dignissimos, error?
        </Item>
        <Item>
            Incidunt voluptas maxime suscipit quod possimus eaque consectetur ipsa earum?
        </Item>
        <Item>
            Quis magnam dicta perspiciatis a recusandae repellendus, possimus soluta odio.
        </Item>
    </>
);

const PageContainer = styled.div`
    width: 300px;
    height: 400px;
    backgroundColor: #aaa;
    display: flex;
    flex-direction: column;
`;

const PageNumberButton = styled.button`
    border-radius: 5px;
    background: #0857c3;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    font-size: 14pt;
    font-weight: bold;
    font-family: Arial, sans-serif;
    color: white;
    width: 50px;
    height: 50px;
    border: 0;
    transition: 1s background ease-in-out;
    margin-right: 10px;
    margin-bottom: 10px;

    :disabled {
        background-color: #333;
    }
`;

export const Pagination = () => {
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(1);

    const toPage = (newPage: number) => () => setPage(newPage);

    return (
        <PageContainer>
            <PaginationComponent
                page={page}
                onPagesChange={setPages}
                transitionDuration="2s"
                transitionTimingFunction="cubic-bezier(0.48, 1.48, 0.54,-0.59)"
            >
                <DemoChildren />
            </PaginationComponent>
            <div>
                {
                    Array.from(Array(pages).keys()).map(pageNumber => (
                        <PageNumberButton key={`Page-${pageNumber}`} type="button" onClick={toPage(pageNumber)} disabled={page === pageNumber}>
                            { pageNumber + 1 }
                        </PageNumberButton>
                    ))
                }
            </div>
        </PageContainer>
    );
};
