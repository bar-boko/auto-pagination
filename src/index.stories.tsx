import styled from '@emotion/styled';
import PaginationComponent from '.';

export default ({
    title: 'Pagination',
    component: PaginationComponent,
})

const DemoChildren = () => (
    <>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        <div>Earum tempora officia cum quas quae, aliquid ex.</div>
        <div>Hic fuga ex, reprehenderit animi suscipit nobis molestiae.</div>
        <div>Possimus, repellendus accusamus? Expedita quae veritatis dicta quos.</div>
        <div>Alias expedita exercitationem natus, voluptate mollitia excepturi obcaecati.</div>
        <div>Atque quod maiores dolore quaerat similique. Beatae, reiciendis?</div>
        <div>Repellendus inventore dicta, nulla error reprehenderit eius quo!</div>
        <div>Odit facilis nemo nostrum qui dolorum quidem placeat.</div>
        <div>Doloremque corporis est non debitis, saepe eos voluptates?</div>
        <div>Fuga nesciunt tempora, quis deserunt cum a odit.</div>
        <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium?</div>
        <div>Nobis iste, dolorem eveniet perspiciatis nostrum dignissimos modi consequuntur?</div>
        <div>Dolores cumque illum vero ea. Soluta cum vel ea.</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, provident.</div>
        <div>Beatae adipisci ad et, aspernatur ipsa commodi nisi vel optio.</div>
        <div>Libero dignissimos optio vero amet laudantium officiis exercitationem eligendi eos!</div>
        <div>Hic minima nobis quo eligendi odit asperiores incidunt fugit dolore?</div>
        <div>Aperiam, amet quos. Possimus recusandae quas quis, ipsum voluptatum quam!</div>
        <div>Officia impedit porro odio error cum sunt placeat perspiciatis quia?</div>
        <div>Quae quo repudiandae officia blanditiis quidem? Vel veritatis deserunt amet!</div>
        <div>Soluta ullam laboriosam hic velit exercitationem totam tenetur. Dignissimos, error?</div>
        <div>Incidunt voluptas maxime suscipit quod possimus eaque consectetur ipsa earum?</div>
        <div>Quis magnam dicta perspiciatis a recusandae repellendus, possimus soluta odio.</div>
    </>
);

const StyledPagination = styled(PaginationComponent)`
    width: 200px;
    height: 300px;
`;

export const Pagination = () => {
    return (
        <StyledPagination
            page={1}
            onPagesChange={() => {}}
        >
            <DemoChildren />
        </StyledPagination>
    );
};
