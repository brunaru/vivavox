import "./style.css"
import logo from "../../images/logo.svg"

function About () {
    return(
        <div className="aboutContainer">
            <section className="leftSection">
                <div className="logo">
                    <img src={logo} alt="Logo VivaVox"></img>
                </div>
                <h4>Artigos relacionados:</h4>
                <div className="articlesGrid">
                    <div className="article">
                        <a href=""></a>
                    </div>
                    <div className="article">
                        <a href=""></a>
                    </div>
                    <div className="article">
                        <a href=""></a>
                    </div>
                     <div className="article">
                        <a href=""></a>
                    </div>
                </div>
            </section>
            <section className="rightSection">
                <h3>Sobre a Plataforma:</h3>
                <p>
                    A Associação Americana de Fala-Linguagem-Audição (American Speech-Language-Hearing Association, 1993) 
                    define um distúrbio de comunicação como uma deficiência na capacidade de receber, enviar, processar e compreender conceitos ou sistemas de símbolos verbais e não-verbais. 
                    Dessa forma, é essencial que existam soluções para intermediar o processo comunicativo das pessoas que apresentam tais questões, 
                    dado que a habilidade de comunicação é essencial para garantir a formação e consolidação de um indivíduo no meio social.
                </p>
                <p>
                    Sendo assim, a plataforma VivaVox foi desenvolvida em um contexto de escassez de alternativas de baixo custo, visando possibilitar a criação de pranchas de comunicação personalizáveis de uma maneira simples, intuitiva e gratuita. Portanto, para atingir tais objetivos, 
                    a ferramenta conta com um vasto banco de cartões e áudios pré-definidos bem como a possibilidade de inserir imagens e sons definidos pelo usuário, além das diferentes alternativas de varreduras (com piscar ou via teclado) dentro das pranchas.
                </p>
                <h3>Conheça a nossa mascote:</h3>
                <p>
                    A tartaruguinha Coral foi escolhida para representar o projeto, uma vez que as tartarugas são animais que, assim como os usuários da plataforma, possuem formas de comunicação únicas. 
                </p>
            </section>
        </div>
    );
}

export default About;