import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router'
import Error404 from './404'

function Title(props){
    const Tag = props.tag || 'h1'
    return(
        <>
            <Tag>{props.children}</Tag>



            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    )
}


export default function PaginaInicial() {
    // const username = 'PedroHumberto';
    const [username, setUsername] = React.useState('')
    const route = useRouter()
    function storeVillage(key, village){
      localStorage.setItem(key, village)
    } 

    React.useEffect(() => {
      storeVillage('ls_village')
    }, [])

    
    
    


    return (
      <>
        
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: 'url(https://wallpapercave.com/wp/wp4068641.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            tag='h1'
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
              border: '1px solid orange' 
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (eventInfo){
                eventInfo.preventDefault()
                route.push(`/chat?username=${username}`)
                
                
                // window.location.href= '/chat'
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title tag="h2">Welcome to the Ninja Way</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
              

              

              <TextField
                fullWidth
                value={username}
                onChange={function Handler(event){
                    /*event é o estado atual quando digitado*/
                    const newValue = event.target.value
                    setUsername(newValue)
                  }}
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              {/* Usar default value pois o react exige o valor default para elemento select. 
              Ele possui o proprio elemento Select 'react-select' porem preferi fazer o meu*/}
              <select 
                defaultValue={'DEFAULT'} 
                onChange={village => storeVillage('ls_village', village.target.value)}>
                <option value="DEFAULT" disabled>Choose your village...</option>
                <option value="Konohagakure">Konohagakure</option>
                <option value="Sunagakure">Sunagakure</option>
                <option value="Kumogakure">Kumogakure</option>
                <option value="Kirigakure">Kirigakure</option>
                <option value="Iwagakure">Iwagakure</option>
              </select>
              
              

              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            
            </Box>
                <Error404 Username={username}/>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }

/*
function HomePage() {
    return(
        <div>
            <GlobalStyle />
            <Title tag="h1">Ola2</Title>
            <h2>Opa</h2>

        </div>
    )
    
}

export default HomePage
*/
