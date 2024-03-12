#include "totvs.ch"
#include "restful.ch"


WSRESTFUL POUI DESCRIPTION "Webservice treinamento POUI"

    WSMETHOD GET Menu DESCRIPTION "Menu dinamico via WS" PATH "/menu"
    WSMETHOD GET AppMonitor DESCRIPTION "Lista de usuarios conectados" PATH "/appmonitor"
    WSMETHOD GET Integracoes DESCRIPTION "Lista de usuarios conectados" PATH "/integracoes"
    WSMETHOD GET Clientes DESCRIPTION "Lista de Clientes SA1" PATH "/clientes"
    WSMETHOD POST Cliente DESCRIPTION "Grava cliente SA1" PATH "/cliente"
    WSMETHOD POST Login DESCRIPTION "Menu dinamico via WS" PATH "/login"
    WSMETHOD DELETE DropUser DESCRIPTION "Menu dinamico via WS" PATH "/dropuser"

END WSRESTFUL

WSMETHOD POST Login WSSERVICE POUI
    local lRet := .f.
    local jRet := jsonObject():New()
    local cUsr
    local cPwd

    jRet:fromJSON(::GetContent())

    cUsr := jRet["params"]["updates"][1]["value"]
    cPwd := jRet["params"]["updates"][2]["value"]
    freeObj(jRet)

    RPCSetType(3)
    if RPCSetEnv("99", "01", cUsr, cPwd)
        ::SetContentType("application/json")

        jRet := jsonObject():New()
        jRet["id"]      := RetCodUsr()
        jRet["nome"]    := UsrFullName()
        jRet["empresa"] := cEmpAnt
        jRet["filial"]  := cFilAnt

        ::SetResponse(encodeUTF8(jRet:toJSON()))
        lRet := .t.
    else
        SetRestFault(401, "Usuario ou senha invalidos")
    endif
    freeObj(jRet)
    RPCClearEnv()

return lRet

WSMETHOD POST Cliente WSSERVICE POUI
return .t.

WSMETHOD GET Clientes WSSERVICE POUI
    local lRet := .f.
    local cAlias := GetNextAlias()
    local jRet := jsonObject():New()

    BEGINSQL ALIAS cAlias
        SELECT A1_FILIAL,A1_COD,A1_LOJA,A1_NOME,A1_PESSOA,A1_END,A1_BAIRRO,A1_TIPO,A1_EST,A1_CODMUN,A1_MUN,A1_CGC,A1_INSCR
        FROM %TABLE:SA1% SA1
        WHERE A1_FILIAL = %XFILIAL:SA1% AND SA1.%NOTDEL%
    ENDSQL

    jRet["hasNext"] := .f.
    jRet["items"] := {}

    while (cAlias)->(!eof())
        aAdd(jRet["items"], jsonObject():New())

        aTail(jRet["items"])["filial"] := (cAlias)->A1_FILIAL
        aTail(jRet["items"])["codigo"] := (cAlias)->A1_COD
        aTail(jRet["items"])["loja"]   := (cAlias)->A1_LOJA
        aTail(jRet["items"])["cgc"]   := (cAlias)->A1_CGC
        aTail(jRet["items"])["ie"]   := (cAlias)->A1_INSCR
        aTail(jRet["items"])["nome"] := (cAlias)->A1_NOME
        aTail(jRet["items"])["tpessoa"] := (cAlias)->A1_PESSOA
        aTail(jRet["items"])["end"] := (cAlias)->A1_END
        aTail(jRet["items"])["bairro"] := (cAlias)->A1_BAIRRO
        aTail(jRet["items"])["tipo"] := (cAlias)->A1_TIPO
        aTail(jRet["items"])["uf"] := (cAlias)->A1_EST
        aTail(jRet["items"])["codmun"] := (cAlias)->A1_CODMUN
        aTail(jRet["items"])["cidade"] := (cAlias)->A1_MUN

        (cAlias)->(dbSkip())
    end
    ::SetContentType("application/json")
    ::SetResponse(encodeUTF8(jRet:toJSON()))

    (cAlias)->(dbCloseArea())
    freeObj(jRet)

return lRet

WSMETHOD GET Integracoes WSSERVICE POUI
    local lRet := .f.
    local cAlias := GetNextAlias()
    local jRet := jsonObject():New()

    BEGINSQL ALIAS cAlias
        SELECT ZZ1_FILIAL,ZZ1_ID,ZZ1_FINALI,ZZ1_STATUS
        FROM %TABLE:ZZ1% ZZ1
        WHERE ZZ1_FILIAL = %XFILIAL:ZZ1% AND ZZ1.%NOTDEL%
    ENDSQL

    jRet["items"] := {}

    while (cAlias)->(!eof())
        aAdd(jRet["items"], jsonObject():New())

        aTail(jRet["items"])["filial"] := (cAlias)->ZZ1_FILIAL
        aTail(jRet["items"])["id"] := (cAlias)->ZZ1_ID
        aTail(jRet["items"])["finalidade"] := (cAlias)->ZZ1_FINALI
        aTail(jRet["items"])["status"] := (cAlias)->ZZ1_STATUS

        (cAlias)->(dbSkip())
    end
    ::SetContentType("application/json")
    ::SetResponse(encodeUTF8(jRet:toJSON()))

    (cAlias)->(dbCloseArea())
    freeObj(jRet)

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

WSMETHOD DELETE DropUser WSSERVICE POUI
    local JBody := jsonObject():New()

    jBody:fromJSON(::getContent())

    KillUser(jBody["user"], jBody["host"], jBody["tid"], jBody["server"])

    ::SetContentType("application/json")
    ::SetResponse(encodeUTF8(jBody:toJSON()))
    
    freeObj(jBody)
return .t.

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


User Function poui()
    local oWebChannel := TWebChannel():New()
    oWebChannel:bJsToAdvpl := {|self,codeType,codeContent| jsToAdvpl(self,codeType,codeContent) }
    nPort := oWebChannel::connect()

    FWCallApp("treinamento-poui",,, oWebChannel)

return

Static Function JsToAdvpl(oWebChannel,cType,cContent)
    local cJSON := '{"nome": "' + UsrFullName(RetCodUsr()) + '", "empresa": "' + cEmpAnt + '", "filial": "' + cFilAnt + '"}'

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
    oWebChannel:AdvPLToJS('userInfo', cJSON)
Return .T.
