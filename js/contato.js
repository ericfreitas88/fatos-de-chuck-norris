$(document).ready(function() {
    // Inicialização da página de contato
    console.log('Página de contato carregada');
    
    // Animação suave para os elementos da página
    $('.container-contato, .container-projetos').each(function(index) {
        $(this).css({
            'opacity': '0',
            'transform': 'translateY(20px)'
        });
        
        setTimeout(() => {
            $(this).animate({
                'opacity': '1'
            }, 500);
            $(this).css('transform', 'translateY(0)');
        }, 300 * (index + 1));
    });
    
    // Validação do formulário de contato
    $('#form-contato').on('submit', function(e) {
        e.preventDefault();
        
        // Obter valores dos campos
        const nome = $('#nome').val().trim();
        const email = $('#email').val().trim();
        const assunto = $('#assunto').val().trim();
        const mensagem = $('#mensagem').val().trim();
        
        // Validação básica
        let isValid = true;
        let errorMessage = '';
        
        if (nome === '') {
            isValid = false;
            errorMessage = 'Por favor, informe seu nome.';
            $('#nome').focus();
        } else if (email === '') {
            isValid = false;
            errorMessage = 'Por favor, informe seu email.';
            $('#email').focus();
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage = 'Por favor, informe um email válido.';
            $('#email').focus();
        } else if (assunto === '') {
            isValid = false;
            errorMessage = 'Por favor, informe o assunto da mensagem.';
            $('#assunto').focus();
        } else if (mensagem === '') {
            isValid = false;
            errorMessage = 'Por favor, digite sua mensagem.';
            $('#mensagem').focus();
        }
        
        if (!isValid) {
            // Exibir mensagem de erro
            alert(errorMessage);
            return false;
        }
        
        // Simulação de envio (em um ambiente real, isso seria enviado para um backend)
        $('.btn-enviar').prop('disabled', true).text('Enviando...');
        
        setTimeout(function() {
            // Limpar formulário
            $('#form-contato')[0].reset();
            
            // Exibir mensagem de sucesso
            alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
            
            // Restaurar botão
            $('.btn-enviar').prop('disabled', false).text('Enviar Mensagem');
        }, 1500);
    });
    
    // Função para validar email
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Efeito hover nos cards de projetos
    $('.projeto-card').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-5px)',
                'box-shadow': '0 15px 35px rgba(0,0,0,0.2)'
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0)',
                'box-shadow': '0 5px 15px rgba(0,0,0,0.1)'
            });
        }
    );
});