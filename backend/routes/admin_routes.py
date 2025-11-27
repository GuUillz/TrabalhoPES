from flask import Blueprint, jsonify, request
from controladoras.ctrlPreco import CtrPreco

admin_bp = Blueprint('admin', __name__)
ctr_preco_sistema = CtrPreco()

@admin_bp.route('/preco', methods=['PUT'])
def atualizar_preco():
    dados = request.json
    sucesso, res = ctr_preco_sistema.atualizar_preco(
        dados.get('id_tipo'), 
        dados.get('novo_valor')
    )
    if sucesso:
        return jsonify({"status": "sucesso", "dados": res})
    return jsonify({"status": "erro", "mensagem": res}), 400