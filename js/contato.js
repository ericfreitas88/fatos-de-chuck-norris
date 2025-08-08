$(document).ready(function() {
    // Inicialização da página de contato
    console.log('Página de contato carregada');
    
    // Verificar se há parâmetro de sucesso na URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showSuccessMessage();
        // Limpar a URL sem recarregar a página
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
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
        
        // Verificar reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse === '') {
            isValid = false;
            errorMessage = 'Por favor, confirme que você não é um robô.';
        }
        
        if (!isValid) {
            e.preventDefault();
            showErrorMessage(errorMessage);
            return false;
        }
        
        // Se chegou até aqui, o formulário é válido e será enviado pelo FormSubmit
        $('.btn-enviar').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Enviando...');
    });
    
    // Função para validar email
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Função para exibir mensagem de sucesso
    function showSuccessMessage() {
        $('#form-contato').hide();
        $('#success-message').fadeIn(500);
        
        // Scroll suave para a mensagem
        $('html, body').animate({
            scrollTop: $('#success-message').offset().top - 100
        }, 500);
        
        // Após 5 segundos, mostrar o formulário novamente
        setTimeout(function() {
            $('#success-message').fadeOut(500, function() {
                $('#form-contato').fadeIn(500);
                $('#form-contato')[0].reset();
                grecaptcha.reset();
                $('.btn-enviar').prop('disabled', false).html('<i class="fas fa-paper-plane"></i> Enviar Mensagem');
            });
        }, 5000);
    }
    
    // Função para exibir mensagem de erro
    function showErrorMessage(message) {
        // Remover mensagem de erro anterior se existir
        $('.error-message').remove();
        
        // Criar e exibir nova mensagem de erro
        const errorDiv = $(`
            <div class="error-message" style="
                background: #ff4757;
                color: white;
                padding: 15px;
                border-radius: 8px;
                margin: 15px 0;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideDown 0.3s ease;
            ">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
            </div>
        `);
        
        $('#form-contato').prepend(errorDiv);
        
        // Remover mensagem após 5 segundos
        setTimeout(function() {
            errorDiv.fadeOut(300, function() {
                $(this).remove();
            });
        }, 5000);
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