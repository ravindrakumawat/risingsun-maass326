class TweetsWorker

  extend ActionView::Helpers::TextHelper
  extend Rails.application.routes.url_helpers

  def self.send_blog_tweets(blog_id)
    blog = Blog.find(blog_id)
    msg = "New Blog " + truncate(blog.title, :length=> 115)
    Twitter.update(msg)
  end

  def self.send_event_tweets(event_id)
    evt = Event.find(event_id)
    msg =  "New Event " + truncate(evt.title, :length => 115)
    Twitter.update(msg)
  end

end