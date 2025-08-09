class V1::AuthController < ApplicationController
  def google_oauth2
    access_token = params[:access_token]
    
    unless access_token.present?
      return render json: { error: 'Access token is missing' }, status: :unprocessable_entity
    end

    begin
      user = GoogleAuthService.new(access_token).call

      render json: { 
        token: JsonWebToken.encode({ user_id: user.id }),
        email: user.email
      }, status: :ok

    rescue => e
      Rails.logger.error "Google OAuth error: #{e.message}"
      render json: { error: 'Authentication failed' }, status: :unauthorized
    end
  end
end
