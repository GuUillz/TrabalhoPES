from flask import Blueprint, jsonify, request
from catalogos.CatFilme import CatFilme
from catalogos.CatSessao import CatSessao
from catalogos.CatTipoIngresso import CatTipoIngresso
from controladoras.ctrlCompra import CtrCompra

cliente_bp = Blueprint('cliente', __name__)
ctr_compra_sistema = CtrCompra()

@cliente_bp.route('/filmes', methods=['GET'])
def get_filmes():
    filmes = CatFilme.get_all()
    # Serialização manual dos objetos complexos
    data = [{
        "id": f.id, 
        "titulo": f.titulo, 
        "classificacao": f.classificacao.idade, 
        "descricao_classificacao": f.classificacao.descricao,
        "poster": f.poster, 
        "genero": f.genero.nome,
        "duracao": f.duracao,
        "sinopse": f.sinopse
    } for f in filmes]

    return jsonify({"status": "sucesso", "data": data})

@cliente_bp.route('/filmes/<int:id_filme>/sessoes', methods=['GET'])
def get_sessoes_filme(id_filme):
    sessoes = CatSessao.get_by_filme(id_filme)
    data = [{
        "id": s.id,
        "time": s.horario,
        "room": s.sala.nome,
        "type": s.tipoExibicao.nome,
        "audio": s.tipoAudio.nome
    } for s in sessoes]
    return jsonify({"status": "sucesso", "data": data})

@cliente_bp.route('/sessao/<int:id_sessao>/assentos', methods=['GET'])
def get_assentos_sessao(id_sessao):
    sessao = CatSessao.get_sessao(id_sessao)
    if not sessao:
        return jsonify({"status": "erro", "mensagem": "Sessão não encontrada"}), 404
    
    return jsonify({
        "status": "sucesso",
        "ocupados": sessao.disponibilidade.assentos_ocupados
    })

@cliente_bp.route('/precos', methods=['GET'])
def get_precos():
    tipos = CatTipoIngresso.get_all()
    data = {t.id: t.valor for t in tipos} 
    return jsonify({"status": "sucesso", "data": data})

@cliente_bp.route('/compra/pagamento', methods=['POST'])
def realizar_pagamento():
    dados = request.json
    # Chama a sua controladora
    sucesso, msg = ctr_compra_sistema.realizar_compra(
        dados.get('id_sessao'), 
        dados.get('assentos'), 
        dados.get('tipos'), 
        dados.get('metodo')
    )
    if sucesso:
        return jsonify({"status": "sucesso", "mensagem": msg})
    return jsonify({"status": "erro", "mensagem": msg}), 400