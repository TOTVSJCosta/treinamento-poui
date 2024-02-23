#include "totvs.ch"
#include "restful.ch"


WSRESTFUL POUI DESCRIPTION "Webservice treinamento POUI"

    WSMETHOD GET Menu DESCRIPTION "Menu dinamico via WS" PATH "/menu"
    WSMETHOD GET AppMonitor DESCRIPTION "Lista de usuarios conectados" PATH "/appmonitor"
    WSMETHOD POST Login DESCRIPTION "Menu dinamico via WS" PATH "/login"

END WSRESTFUL

WSMETHOD POST Login WSSERVICE POUI
    local lRet := .f.
    local jHead := oRest:getHeaderRequest()
    local cUsrPwd := decode64(substr(jHead["Authorization"],7))

    cUsrPwd := substr(cUsrPwd,2,len(cUsrPwd) -2)

    RPCSetType(3)
    if RPCSetEnv("99", "01", separa(cUsrPwd,':')[1], separa(cUsrPwd,':')[2])
        ::SetContentType("application/json")
        ::SetResponse('{"user": "' + separa(cUsrPwd,':')[1] + '"}')
        lRet := .t.
    else
        SetRestFault(401, "Usuario ou senha invalidos")
    endif
    RPCClearEnv()

return lRet

WSMETHOD GET Menu WSSERVICE POUI

    local jRet AS JSON
    local cRet AS String
    local aSubItens := {}
    local jsItens

    jRet := jsonObject():New()

    jRet["items"] := {}

    aadd(jRet["items"], jsonObject():New())
    aTail(jRet["items"])["label"] := "Início"
    aTail(jRet["items"])["icon"] := "po-icon-home"
    aTail(jRet["items"])["shortLabel"] := "Início"
    aTail(jRet["items"])["link"] := ""

    aadd(jRet["items"], jsonObject():New())
    aTail(jRet["items"])["label"] := "Monitoramento"
    aTail(jRet["items"])["icon"] := "po-icon-eye"
    aTail(jRet["items"])["shortLabel"] := "Monitoramento"
    aTail(jRet["items"])["link"] := "/monitoramento"

    jsItens := jsonObject():New()
    jsItens["label"] := "Aplicação"
    jsItens["shortLabel"] := "Aplicação"
    jsItens["link"] := "appmonitor"
    aAdd(aSubItens, jsItens)

    freeObj(jsItens)
    jsItens := jsonObject():New()
    jsItens["label"] := "Banco de Dados"
    jsItens["shortLabel"] := "DB"
    jsItens["link"] := "dbmonitor"
    aAdd(aSubItens, jsItens)
    
    aTail(jRet["items"])["subItems"] := aSubItens

    aadd(jRet["items"], jsonObject():New())
    aTail(jRet["items"])["label"] := "Listagens"
    aTail(jRet["items"])["icon"] := "po-icon-home"
    aTail(jRet["items"])["shortLabel"] := "Listagens"
    aTail(jRet["items"])["link"] := "/listagens"

    aadd(jRet["items"], jsonObject():New())
    aTail(jRet["items"])["label"] := "Sair"
    aTail(jRet["items"])["icon"] := "po-icon-exit"
    aTail(jRet["items"])["shortLabel"] := "Sair"
    aTail(jRet["items"])["link"] := "/closeapp"

    cRet := jRet:toJSON()
    freeObj(jRet)
    freeObj(jsItens)

    cRet := substr(cRet, at('[', cRet))
    cRet := left(cRet, len(cRet) -1)
    cRet := encodeUTF8(cRet)

    ::SetContentType("application/json")
    ::SetResponse(cRet)

return .T.

WSMETHOD GET AppMonitor WSSERVICE POUI
    local nConn, cRet
    local aConn := GetUserInfoArray()
    local oAppMon := JsonObject():New()

    oAppMon["items"] := {}

    for nConn := 1 to len(aConn)
        aadd(oAppMon["items"], JsonObject():New())
        atail(oAppMon["items"])["user"] := aConn[nConn,1]
        atail(oAppMon["items"])["host"] := aConn[nConn,2]
        atail(oAppMon["items"])["tid"] := aConn[nConn,3]
        atail(oAppMon["items"])["server"] := aConn[nConn,4]
        atail(oAppMon["items"])["env"] := aConn[nConn,6]
        atail(oAppMon["items"])["conn"] := aConn[nConn,7]
        atail(oAppMon["items"])["obs"] := aConn[nConn,11]
        atail(oAppMon["items"])["mem"] := aConn[nConn,12]
        atail(oAppMon["items"])["ctype"] := aConn[nConn,15]
        atail(oAppMon["items"])["inactive"] := aConn[nConn,16]
    next
    cRet := oAppMon:toJSON()

    ::SetContentType("application/json")
    ::SetResponse(cRet)
    
    freeObj(oAppMon)

return .T.

user function cc2()
    local oBrw := FWMBrowse():New()

    RPCSetEnv("99","01")

    oBrw:SetAlias("CC2")
    oBrw:AddButton("POUI",    'U_POUI()',,4)


    oBrw:Activate()

return

User Function poui()
    local oWebChannel := TWebChannel():New()
    oWebChannel:bJsToAdvpl := {|self,codeType,codeContent| jsToAdvpl(self,codeType,codeContent) }
    nPort := oWebChannel::connect()

    FWCallApp("treinamento-poui",,, oWebChannel)

return

Static Function JsToAdvpl(oWebChannel,cType,cContent)
    Do Case
        // Se a interação que recebi for igual a mensagemJavascript
        Case cType == 'mensagemJavascript'
            // Imprimo a informação que recebi para trabalhar
            alert('O que veio do JS: ' + cContent)
            conOut("'O que veio do JS: ' + cContent")
        // Se a interação que recebi for igual a receberProtheus
        Case cType == 'receberProtheus'
            // Envio um comando ADVPL para minha aplicação Web
            conOut("'O que veio do JS: ' + cContent")
            oWebChannel:AdvPLToJS('mensagemProtheus', 'Comando ADVPL')
    End
Return .T.
