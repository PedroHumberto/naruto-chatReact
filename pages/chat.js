import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'
import nookies from 'nookies'



// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyNjExOSwiZXhwIjoxOTU4OTAyMTE5fQ._8Jv70sI5E3r5tDCOK07UxAh-0sZngXUjjlg9p1-pl0'
const SUPABASE_URL = 'https://vjnfynybrgernfxcirse.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)




function messagesListener(addMessage){
    return supabaseClient
        .from('messages')
        .on('INSERT', (liveListenner) => {
            addMessage(liveListenner.new)
        })
        .subscribe()
}

/*.from() -> ele passa uma tabela*/

// O falta:
// ao passar o mouse em cima da foto do usuario gerar um card mostrando o github, link e foto
// criar um botão de enviar enquete, anexo....
// criar um metodo melhor de autenticação
// impedir de outros usuarios deletar mensagens que não são deles

export default function ChatPage(props) {
    const route = useRouter()
    const logUser = route.query.username
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);
    const [village, setVillage] = React.useState(nookies.get().VILLAGE)
    
    

    
    
    React.useEffect(() => {
        supabaseClient
            .from('messages')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                //console.log('useEffect Data: ' + data)
                setMessageList(data)
            });
        messagesListener((newMessage) => {
            //quando setMessagelist é uma função ele sempre vai retornar
            //o valor da lista de mensagens atualizado
            setMessageList((listValue) => {
                return [
                    newMessage,
                    ...listValue,
                ]
            });
        })
            
    }, [])

    function handleNewMessage(newMessage){
        const message = {
            //id: messageList.length + 1,
            village: village,
            from: logUser,
            text: newMessage,
        };

        supabaseClient
            .from('messages')
            .insert([
            // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
                message
            ])
            .then(({ data }) => {
                console.log('Creating Message ', data);
               
            });
        setMessage('');
    }


    
    function handDeleteMessage(messageId) {
        supabaseClient
            .from('messages')
            .delete()
            .match({ id: messageId })
            .then(({ data }) => {
                //console.log('Esse item ' + messageId)                
                setMessageList(messageList.filter(function (data) {
                    return !data.delete
                  }));
            } )
      }

    


    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://i.pinimg.com/originals/17/4d/ac/174dacaf74b11eecd0491268d266ab18.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList messages={messageList} handDeleteMessage={handDeleteMessage} />
                    {/* {listaDeMensagens.map((actualMessage) => {
                        return (
                            <li key={actualMessage.id}>
                                {actualMessage.from}: {actualMessage.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={ function(event) {
                                
                                const value = event.target.value
                                setMessage(value)
                            }}
                            /*Localiza quando é apertado enter*/
                            onKeyPress={(event) => {
                                if(event.key === 'Enter'){
                                    event.preventDefault();/*Previne dar quebra de linha quando aperta enter*/
                                    handleNewMessage(message);
                                }
                                    
                            }}
                            placeholder="Insert your message here"
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        {/*Callback*/}
                        <ButtonSendSticker
                            onStickerClick={(sticker)=> {
                                handleNewMessage(':sticker: ' + sticker)
                            }}
                        />
                        <Button
                            variant='tertiary'
                            colorVariant='neutral'
                            label='Send'
                            onClick={ (event) => {
                                        event.preventDefault();/*Previne dar quebra de linha quando aperta enter*/
                                        handleNewMessage(message)
                                    }}
                            
                        />
                        

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    //console.log(props);
    
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            <Text tag="strong">
                                {message.from}
                            </Text>
                            <Text>
                                {' from ' + message.village}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Icon 
                                name={"FaTrash"}
                                styleSheet={{
                                        marginLeft: "auto",
                                        marginRight: ".7rem",
                                        transition: ".4s ease all",
                                        cursor: "pointer",
                                       
                                    }}
                                onClick={() => {
                                message.delete = true;
                                props.handDeleteMessage(message.id);
                                }}>
                            </Icon>
                        </Box>
                        {/*Declarativo*/}
                        {message.text.startsWith(':sticker:') 
                        ? (
                            <Image src={message.text.replace(':sticker:', '')}
                                styleSheet={{
                                    maxWidth: '80px'
                                }}
                            />
                        ) 
                        : (
                            message.text
                        ) }

                        
                        
                    </Text>
                );
            })}
        </Box>
    )
}
