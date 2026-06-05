import { Card } from "@/src/components/ui/Card"

export const FormBox = () => {
    return(
        <Card>
            <form action="">
                <div>
                    <div>
                        <label htmlFor="name">Nome</label>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Ex: Mária Silva"
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Município</label>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Ex: Mária Silva"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="message">Mensagem</label>
                    <textarea 
                        name="message"
                        placeholder="Conte nos o que aconteceu"
                    />
                </div>


            </form>
        </Card>
    )
}