from catalogos.CatTipoIngresso import CatTipoIngresso

class CtrPreco:
    def atualizar_preco(self, id_tipo_ingresso, novo_valor):

        obj_tipo = CatTipoIngresso.get_tipo_ingresso(id_tipo_ingresso)
        
        if not obj_tipo:
            return False, "Tipo de ingresso não encontrado"
        
        obj_tipo.setValor(novo_valor)
        
        return True, {"nome": obj_tipo.nome, "novo_valor": obj_tipo.valor}