class GoogleAuthService
  GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'.freeze

  def initialize(access_token)
    @access_token = access_token
  end

  def call
    user_info = fetch_user_info
    user = find_or_create_user(user_info)

    user
  end

  private

  def fetch_user_info
    response = Faraday.get(
      GOOGLE_USER_INFO_URL,
      {},
      { 'Authorization' => "Bearer #{@access_token}" }
    )

    raise 'Failed to fetch user info from Google' unless response.success?

    JSON.parse(response.body)
  end

  def find_or_create_user(user_info)
    User.find_or_create_by(email: user_info['email']) do |user|
      user.name = user_info['name']
      user.auth_id = user_info['sub']
      user.email = user_info['email']
    end
  end
end
